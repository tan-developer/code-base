import { v4 as uuidv4 } from 'uuid';


export default class AbortContainer {
  private static abortList = new Map<string, AbortController>();

  static register () : AbortController {
    const id = this.generateUUID();
    const abortController = new AbortController();
    if (!this.checkControllerExist(id)) {
      this.abortList.set(id, abortController);
    }

    return abortController
  }

  static abortAll () {
    this.abortList.forEach((controller) => {
      controller.abort();
    });

    this.abortList.clear();
  }

  static getController (id: string) : AbortController | undefined {
      return this.abortList.get(id);
  }

  protected static checkControllerExist (id: string) : boolean {
    return this.abortList.has(id);
  }

  static generateUUID () : string {
    return uuidv4();
  }
  
  static getAllControllers () : Map<string, AbortController> {  
    return this.abortList;
  }
}