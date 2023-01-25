import Address from "../value-object/address";
import { Entity } from "../../@shared/entity/entity.abstract";
import {NotificationError} from "../../@shared/notification/notification.error";

export default class Customer extends Entity {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(name: string, id?: string) {
    super()
    this._id = id ?? Math.random().toString(32).substring(2, 10);
    this._name = name;
    this.validate();

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get address() {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate(): void {
    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required"
      })
    }
    if (this._id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required"
      })
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set address(address: Address) {
    this._address = address;
  }
}
