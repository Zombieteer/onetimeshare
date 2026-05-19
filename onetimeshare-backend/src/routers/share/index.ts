import { createAsyncRouter } from "../async-router.js";
import { validate } from "../../middleware/validate.js";
import { shareController } from "./share.controller.js";
import { shareValidators } from "./share.validator.js";

const shareRouter = createAsyncRouter();

shareRouter.post(
  "/",
  validate({ body: shareValidators.createBody }),
  shareController.create,
);

shareRouter.get(
  "/:id",
  validate({ params: shareValidators.idParams }),
  shareController.getById,
);

shareRouter.patch(
  "/:id/opened",
  validate({
    params: shareValidators.idParams,
    body: shareValidators.markOpenedByIdBody,
  }),
  shareController.markOpenedById,
);

shareRouter.patch(
  "/:id/copied",
  validate({
    params: shareValidators.idParams,
    body: shareValidators.markCopiedBody,
  }),
  shareController.markCopied,
);

export default shareRouter;
