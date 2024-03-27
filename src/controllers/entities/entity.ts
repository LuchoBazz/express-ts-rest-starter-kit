import { v4 as uuid } from "uuid";

export abstract class Entity {
  private id: string;

  public constructor(id?: string) {
    this.id = id ?? uuid();
  }

  public getId(): string {
    return this.id;
  }

  protected setId(id: string) {
    this.id = id;
  }
}
