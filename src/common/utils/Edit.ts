import { IAction } from "../types";

export class Edit<T extends { [key: string]: any }> {
  private originalValue: T;
  private value: T;
  private actions: IAction[];

  constructor(originalValue: T, value: T) {
    this.originalValue = originalValue;
    this.value = value;
    this.actions = [];
  }

  public compare(attribute: keyof T, action: IAction): void {
    const originalValue = JSON.stringify(this.originalValue?.[attribute]);
    const value = JSON.stringify(this.value[attribute]);
    if (originalValue != value) this.actions.push(action);
  }

  public getActions(): IAction[] {
    return this.actions;
  }
}
