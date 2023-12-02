import React, { memo } from 'react'
import { Input, InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react'
import { GrSearch } from 'react-icons/gr'

export interface SearchProps extends InputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = memo(({ value, onChange, ...rest }: SearchProps) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <GrSearch size={24} />
      </InputLeftElement>
      <Input
        value={value}
        onChange={onChange}
        variant="outline"
        placeholder="start searching..."
        _placeholder={{
          textTransform: 'capitalize',
        }}
        {...rest}
      />
    </InputGroup>
  )
})

export default Search
