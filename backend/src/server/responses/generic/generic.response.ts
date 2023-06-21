import type { Response } from 'express';
import type { TResponseStatus } from '../response.type';

abstract class ApiResponseAbstract {
  protected abstract status: number;

  protected abstract res: Response;

  protected abstract sanitize(): this;
  protected abstract compose(): this;
  protected abstract setStatus(): this;
  protected abstract finish(): Response;
  protected abstract pipeline(): Response;
  public abstract send(): Response;
}

class GenericApiResponse extends ApiResponseAbstract {
  protected res: Response;

  protected status: number;

  protected body?: {
    [key: string]: unknown;
  } & (
    | {
        data: Record<string, unknown>;
      }
    | {
        miscellaneous: Record<string, unknown>;
      }
  );

  protected constructor({ res, status }: { res: Response; status: TResponseStatus }) {
    super();

    this.res = res;
    this.status = status;
  }

  protected sanitize() {
    // ...
    return this;
  }

  protected compose() {
    // ...
    return this;
  }

  protected setStatus(): this {
    this.res.status(this.status);
    return this;
  }

  protected finish(): Response {
    return this.res.send(this.body);
  }

  protected pipeline(): Response {
    return this.setStatus().sanitize().compose().finish();
  }

  public send(): Response {
    return this.pipeline();
  }
}

// const res = {
//   status: (number) => {},
//   send: (body) => {
//     console.log(this);
//   },
// } as unknown as Response;

// const err = new ErrorR2({ res, status: 400 });
// err.send();

export { GenericApiResponse };
