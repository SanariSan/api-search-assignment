import { Button, Flex, Input, InputGroup, Text, useColorModeValue } from '@chakra-ui/react';
import { ErrorMessage, Field, Form as FormikForm } from 'formik';
import type { FC } from 'react';
import { memo } from 'react';
import MaskedInput from 'react-text-mask';
import { COLORS } from '../../chakra-setup';
import type { TSearchComponent } from './search.type';
import { PHONE_NUMBER_MASK } from './search.const';

const SearchComponent: FC<TSearchComponent> = ({ isLoading, ...rest }) => {
  const { handleSubmit, errors, touched, handleChange } = rest;
  const [btnColor, errorMsg, inactive, active] = [
    useColorModeValue(COLORS.blue[800], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.red[500], COLORS.red[300]),
    useColorModeValue(COLORS.whatsapp.navBgLight, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.activeLight, COLORS.whatsapp.activeDark),
  ];

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
          <Text variant={'xxxl'}>Entities search</Text>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3} w={'100%'}>
            <Text fontWeight={'bold'} variant={'md'}>
              Email
            </Text>
            <InputGroup size="md">
              <Input
                as={Field}
                isInvalid={touched.email !== undefined && errors.email !== undefined}
                type="email"
                name="email"
                aria-label="email"
                placeholder="Enter entity email"
                borderColor={inactive}
                focusBorderColor={active}
              />
            </InputGroup>
            <ErrorMessage name="email">
              {(errorMessage: string) => (
                <Text variant={'sm'} color={errorMsg}>
                  {errorMessage}
                </Text>
              )}
            </ErrorMessage>
          </Flex>

          <Flex direction={'column'} alignItems={'flex-start'} gap={3} w={'100%'}>
            <Text fontWeight={'bold'} variant={'md'}>
              Number
            </Text>
            <InputGroup size="md">
              <Field
                name="number"
                type={'text'}
                isInvalid={touched.number !== undefined && errors.number !== undefined}
                onChange={handleChange}
              >
                {({ field }) => (
                  <Input
                    as={MaskedInput}
                    {...field}
                    guide={true}
                    mask={PHONE_NUMBER_MASK}
                    // showMask={true}
                    placeholder="__-__-__"
                    borderColor={inactive}
                    focusBorderColor={active}
                  />
                )}
              </Field>
            </InputGroup>
            <ErrorMessage name="number">
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
              {isLoading ? 'Loading...' : 'Search'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </FormikForm>
  );
};

const SearchComponentMemo = memo(SearchComponent);

export { SearchComponentMemo };
