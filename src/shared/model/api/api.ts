export abstract class Api {
  private readonly router: IRouter;

  constructor(router: IRouter) {
    this.router = router;
  }
}
