import type { QuestionCollection } from 'inquirer';

type TPromptDefault<T> = QuestionCollection & {
  type: 'input' | 'number' | 'confirm' | 'password';
  name?: string;
  default: T;
};
type TPromptNoDefault = QuestionCollection & {
  type: 'checkbox' | 'list';
  name?: string;
  default?: never;
};

// TODO: figure out why not working as intended (not forbidding use of default)
type TPrompt<T> = TPromptDefault<T> | TPromptNoDefault;

export type { TPrompt };
