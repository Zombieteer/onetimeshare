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

  getStatus = async (req: Request, res: Response) => {
    const status = await shareService.getStatus(getIdParam(req));
    res.sendApiResponse(status);
  };

  markOpened = async (req: Request, res: Response) => {
    const { passphase, openedAt } = req.body as { passphase: string; openedAt?: string };
    const result = await shareService.markOpened(getIdParam(req), {
      passphase,
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
