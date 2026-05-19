import type { Request, Response } from "express";
import { moment } from "../../utils/moment.js";
import { shareService } from "./share.service.js";
import type { CreateShareInput } from "./share.service.js";

function getIdParam(req: Request): string {
  return req.params.id as string;
}

export class ShareController {
  create = async (req: Request, res: Response) => {
    const share = await shareService.create(req.body as CreateShareInput);
    res.sendApiResponse(share, 201);
  };

  getById = async (req: Request, res: Response) => {
    const share = await shareService.getById(getIdParam(req));
    res.sendApiResponse(share);
  };

  markOpenedById = async (req: Request, res: Response) => {
    const { passphrase, openedAt } = req.body as { passphrase: string; openedAt?: string };
    const result = await shareService.markOpenedById(getIdParam(req), {
      passphrase,
      openedAt: openedAt ? moment(openedAt).toDate() : undefined,
    });
    res.sendApiResponse(result);
  };

  markCopied = async (req: Request, res: Response) => {
    const { copiedAt } = req.body as { copiedAt?: string };
    const status = await shareService.markCopied(
      getIdParam(req),
      copiedAt ? moment(copiedAt).toDate() : undefined,
    );
    res.sendApiResponse(status);
  };
}

export const shareController = new ShareController();
