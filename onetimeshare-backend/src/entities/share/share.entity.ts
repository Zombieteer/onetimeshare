import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { randomUUID } from "node:crypto";
import { MacroRegion } from "./macro-region.enum.js";
import { env } from "../../config/env.js";

@Entity("shares")
export class Share extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column({
    type: "enum",
    enum: MacroRegion,
    enumName: "macro_region",
  })
  region!: MacroRegion;

  @Column({ type: "text" })
  encryptedSecret!: string;

  @Column({ type: "varchar", length: 512 })
  encryptionKey!: string;

  @Column({ type: "varchar", length: 64 })
  encryptionType!: string;

  @Column({ type: "integer" })
  ttl!: number;

  @Column({ type: "varchar", length: 512 })
  passphrase!: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  openedAt!: Date | null;

  @Column({ type: "timestamptz", nullable: true })
  expiredAt!: Date | null;

  @Column({ type: "timestamptz", nullable: true })
  copiedAt!: Date | null;

  @BeforeInsert()
  setId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }

  toPublic() {
    return {
      id: this.id,
      region: this.region,
      encryptionType: this.encryptionType,
      ttl: this.ttl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      openedAt: this.openedAt,
      expiredAt: this.expiredAt,
      copiedAt: this.copiedAt,
      url: `${env.domain}/secret/${this.id}`
    };
  }

  toOpened(secret: string) {
    return {
      ...this.toPublic(),
      secret,
    };
  }
}
