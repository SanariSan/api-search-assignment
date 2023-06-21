import { Separator } from 'inquirer';
import {
  cliPrompt,
  validateEmailDefault,
  validateNumDefault,
  validatePassDefault,
} from '../modules/access-layer/cli-prompts';

async function examplePromptCLI() {
  const confirmPromptResult = await cliPrompt<boolean>({
    type: 'confirm',
    message: 'confirm',
    default: true,
  });
  const textPromptResult = await cliPrompt<string>({
    type: 'input',
    message: 'text',
    default: 'sample',
  });
  const numPromptResult = await cliPrompt<number>({
    type: 'number',
    message: 'number',
    default: 123,
    validate: validateNumDefault,
  });
  const passPromptResult = await cliPrompt<string>({
    type: 'password',
    message: 'pass',
    default: 'ABCabc123',
    validate: validatePassDefault,
  });
  const emailPromptResult = await cliPrompt<string>({
    type: 'input',
    message: 'email',
    default: 'e@mail.ru',
    validate: validateEmailDefault,
  });
  const checkboxPromptResult = await cliPrompt<Array<string | Record<string, unknown>>>({
    type: 'checkbox',
    message: 'checkbox',
    choices: [
      new Separator(),
      'first',
      { name: 'second', value: 'value second', checked: true }, // string
      { name: 'third', value: { a: 1, b: 2 }, checked: true }, // ObjectAny
      new Separator(' = Custom separator = '),
      'fourth',
      { name: 'fifth', value: 'value fifth', disabled: 'Unavailable now' },
    ],
  });
  const listPromptResult = await cliPrompt<string>({
    type: 'list',
    message: 'list',
    choices: [
      new Separator(),
      'first',
      'second',
      new Separator(' = Custom separator = '),
      'third',
      { name: 'fourth', value: 'value fourth', disabled: 'Unavailable now' },
    ],
  });

  console.log(textPromptResult);
  console.log(confirmPromptResult);
  console.log(numPromptResult);
  console.log(passPromptResult);
  console.log(emailPromptResult);
  console.log(checkboxPromptResult);
  console.log(listPromptResult);
}

export { examplePromptCLI };
