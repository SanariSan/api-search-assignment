import { prompt } from 'inquirer';
import { CliPromptError } from '../../core/cli-prompt';
import { isValidString, randomHex } from '../../../helpers/util';
import type { TPrompt } from './cli-prompts.access-layer.type';

const cliPrompt = async <TAnswer = unknown>(optionsObject: TPrompt<TAnswer>): Promise<TAnswer> => {
  const name = isValidString(optionsObject.name)
    ? (optionsObject.name as string)
    : await randomHex();

  return prompt({ ...optionsObject, name })
    .then((value) => value[name] as TAnswer)
    .catch((error: Readonly<Error>) => {
      throw new CliPromptError(error.message);
    });
};

export { cliPrompt };
