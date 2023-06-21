import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { COLORS } from '../../chakra-setup';
import type { TLogin } from './login.type';

const LoginComponent: FC<TLogin> = ({ isLoading, onFillWithTemplate, ...rest }) => {
  const { handleSubmit, errors, touched } = rest;
  const [hidden, setHidden] = useState(true);
  const [btnColor, errorMsg, inactiveIcon, secondaryAlt, inactive, active] = [
    useColorModeValue(COLORS.blue[800], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.red[500], COLORS.red[300]),
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.whatsapp.navBgLight, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.activeLight, COLORS.whatsapp.activeDark),
  ];

  const toggleHidden = useCallback(() => {
    setHidden((s) => !s);
  }, []);

  return (
    <FormikForm
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'center'} p={9}>
        <Flex
          w={'max-content'}
          h={'max-content'}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={5}
        >
          <Text variant={'xxxl'}>Log in</Text>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3} w={'100%'}>
            <Text fontWeight={'bold'} variant={'md'}>
              Id Instance
            </Text>
            <InputGroup size="md">
              <Input
                as={Field}
                isInvalid={touched.idInstance !== undefined && errors.idInstance !== undefined}
                type="text"
                name="idInstance"
                aria-label="idInstance"
                placeholder="Enter idInstance"
                borderColor={inactive}
                focusBorderColor={active}
              />
            </InputGroup>
            <ErrorMessage name="idInstance">
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3} w={'100%'}>
            <Text fontWeight={'bold'} variant={'md'}>
              Api Token Instance
            </Text>
            <InputGroup size="md">
              <Input
                as={Field}
                isInvalid={
                  touched.apiTokenInstance !== undefined && errors.apiTokenInstance !== undefined
                }
                type={hidden ? 'password' : 'text'}
                name="apiTokenInstance"
                placeholder="Enter apiTokenInstance"
                borderColor={inactive}
                focusBorderColor={active}
              />
              <InputRightElement width="40px">
                <Icon
                  as={hidden ? AiFillEyeInvisible : AiFillEye}
                  onClick={toggleHidden}
                  boxSize={{ base: 4, sm: 5 }}
                  color={inactiveIcon}
                  _hover={{
                    color: secondaryAlt,
                  }}
                  _active={{
                    color: inactiveIcon,
                  }}
                  cursor={'pointer'}
                />
              </InputRightElement>
            </InputGroup>
            <ErrorMessage name="apiTokenInstance">
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex w={'100%'} alignItems={'center'} justifyContent={'center'} gap={6}>
            <Button
              type={'submit'}
              colorScheme={'whatsapp'}
              size={{ base: 'sm', sm: 'md' }}
              color={btnColor}
              opacity={1}
              _disabled={{
                opacity: 0.5,
              }}
              isDisabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Log in'}
            </Button>
            <Button
              variant={'outline'}
              colorScheme={'whatsapp'}
              size={{ base: 'sm', sm: 'md' }}
              isDisabled={isLoading}
              onClick={onFillWithTemplate}
            >
              Fill with my keys
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </FormikForm>
  );
};

export { LoginComponent };
