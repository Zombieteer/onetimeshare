import { Share as ShareEntity } from "../../entities/share/share.entity.js";
import type { MacroRegion } from "../../entities/share/macro-region.enum.js";
import { AppError } from "../../errors/app-error.js";
import { moment, now } from "../../utils/moment.js";
import {
  decryptSecret,
  encryptSecret,
  hashPassphase,
  verifyPassphase,
  type EncryptionType,
} from "../../utils/encryption.js";

export interface CreateShareInput {
  region: MacroRegion;
  secret: string;
  passphase: string;
  encryptionType?: EncryptionType;
  ttl: number;
  id?: string;
}

export interface markOpenedByIdInput {
  passphase: string;
  openedAt?: Date;
}

function toShareStatus(share: ShareEntity) {
  return {
    id: share.id,
    region: share.region,
    ttl: share.ttl,
    encryptionType: share.encryptionType,
    createdAt: share.createdAt,
    openedAt: share.openedAt,
    expiredAt: share.expiredAt,
    copiedAt: share.copiedAt,
    isExpired: share.expiredAt ? moment(share.expiredAt).isSameOrBefore(now()) : false,
  };
}

export class ShareService {
  async create(input: CreateShareInput) {
    const expiredAt = now().add(input.ttl, "seconds").toDate();
    const encryptionType = input.encryptionType ?? "aes-256-gcm";

    const encrypted = encryptSecret(input.secret, input.passphase, encryptionType);

    const share = ShareEntity.create({
      id: input.id,
      region: input.region,
      encryptedSecret: encrypted.encryptedSecret,
      encryptionKey: encrypted.encryptionKey,
      encryptionType: encrypted.encryptionType,
      passphase: hashPassphase(input.passphase),
      ttl: input.ttl,
      expiredAt,
    });

    const saved = await share.save();
    return saved.toPublic();
  }

  async getById(id: string) {
    const share = await this.findShareOrThrow(id);
    this.assertNotExpired(share);
    return share.toPublic();
  }

  async getStatus(id: string) {
    const share = await this.findShareOrThrow(id);
    return toShareStatus(share);
  }

  async markOpenedById(id: string, input: markOpenedByIdInput) {
    const share = await this.findShareOrThrow(id);
    this.assertNotExpired(share);

    if (share.openedAt) {
      throw new AppError(409, "Share has already been opened");
    }

    verifyPassphase(share.passphase, input.passphase);

    const secret = decryptSecret(
      share.encryptedSecret,
      share.encryptionKey,
      input.passphase,
      share.encryptionType as EncryptionType,
    );

    share.openedAt = input.openedAt ?? now().toDate();
    const saved = await share.save();

    return saved.toOpened(secret);
  }

  async markCopied(id: string, copiedAt?: Date) {
    const share = await this.findShareOrThrow(id);
    this.assertNotExpired(share);

    share.copiedAt = copiedAt ?? now().toDate();
    const saved = await share.save();
    return toShareStatus(saved);
  }

  private async findShareOrThrow(id: string) {
    const share = await ShareEntity.findOneBy({ id });

    if (!share) {
      throw new AppError(404, "Share not found");
    }

    return share;
  }

  private assertNotExpired(share: ShareEntity) {
    if (share.expiredAt && moment(share.expiredAt).isSameOrBefore(now())) {
      throw new AppError(410, "Share has expired");
    }
  }
}

export const shareService = new ShareService();
