import type { FormikProps } from 'formik';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC, FormEventHandler } from 'react';
import { memo } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { COLORS } from '../../../../chakra-setup';
import type { TChatboxFormValues } from '../../../../containers/dashboard';
import { SkeletonPlaceholderComponentMemo } from '../../../skeleton';

type TProps = FormikProps<TChatboxFormValues>;
type TChatboxComponent = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  isLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

const ChatboxComponent: FC<TChatboxComponent> = ({ isLoading, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;
  const [bg, navBg, textColorAltDark, errorMsg, textColor] = [
    useColorModeValue(COLORS.whatsapp.bgLight, COLORS.whatsapp.bgDark),
    useColorModeValue(COLORS.whatsapp.navBgLight, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.textColorAltDark, COLORS.whatsapp.textColorAltDark),
    useColorModeValue(COLORS.red[500], COLORS.red[300]),
    useColorModeValue(COLORS.whatsapp.textColorDark, COLORS.whatsapp.textColorDark),
  ];

  return (
    <FormikForm
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <SkeletonPlaceholderComponentMemo
        position={'absolute'}
        zIndex={1}
        isLoading={true}
        width={'100%'}
        height={'100%'}
        minH={'40px'}
        opacity={isLoading ? 0.75 : 0}
        startColor={navBg}
        endColor={bg}
      />
      <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'center'} p={3}>
        <InputGroup size="md" position={'relative'}>
          <Input
            as={Field}
            isInvalid={touched.message !== undefined && errors.message !== undefined}
            name="message"
            type="text"
            aria-label="message"
            placeholder={isLoading ? 'Processing your message...' : 'Enter your message'}
            borderRadius={'10px'}
            bg={navBg}
            borderColor={'transparent'}
            color={textColor}
            focusBorderColor={'transparent'}
            _hover={{ borderColor: 'transparent' }}
            _placeholder={{ color: textColorAltDark }}
            me={3}
          />
          <InputRightElement width="50px">
            <Button
              type={'submit'}
              size={'xs'}
              borderRadius={'20px'}
              isDisabled={isLoading}
              cursor={isLoading ? 'progress' : 'pointer'}
            >
              <ArrowForwardIcon boxSize={{ base: 3, sm: 4 }} cursor={'pointer'} />
            </Button>
          </InputRightElement>
        </InputGroup>
        <ErrorMessage name="message">
          {(errorMessage: string) => (
            <Text variant={'xs'} color={errorMsg} pl={4}>
              {errorMessage}
            </Text>
          )}
        </ErrorMessage>
      </Flex>
    </FormikForm>
  );
};

const ChatboxComponentMemo = memo(ChatboxComponent);

export { ChatboxComponentMemo };
