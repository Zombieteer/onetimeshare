export type ShareEntity = {
    id: string;
    region: string,
    encryptionType: string,
    ttl: number,
    createdAt: Date,
    updatedAt: Date,
    openedAt: Date,
    expiredAt: Date,
    copiedAt: Date,
    url: string
    needPassphrase?: boolean
};
  