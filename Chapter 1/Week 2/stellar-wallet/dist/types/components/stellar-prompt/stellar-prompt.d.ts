export interface Prompter {
  show: boolean;
  message?: string;
  placeholder?: string;
  options?: Array<any>;
  resolve?: Function;
  reject?: Function;
}
export declare class Prompt {
  private element;
  prompter: Prompter;
  private input;
  watchHandler(newValue: Prompter, oldValue: Prompter): void;
  componentDidLoad(): void;
  cancel(e: Event): void;
  submit(e: Event): void;
  update(e: any): void;
  render(): any;
}
