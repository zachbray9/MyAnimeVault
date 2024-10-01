import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useReactSelectStyles } from "../../styles/reactSelectStyles";
import { WatchStatusOptions } from "../../constants/watchStatusOptions";
import { GenreOptions } from "../../constants/genreOptions";
import { SortOptions } from "../../constants/sortOptions";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { ReactSelectOption } from "../../models/reactSelectOption";

export default observer(function FilterSection() {
    const { listStore } = useStore()
    const selectStyles = useReactSelectStyles()

    return (
        <Stack gap='1rem'>
            <InputGroup>
                <InputLeftElement>
                    <SearchIcon color='text.subtle' />
                </InputLeftElement>

                <Input placeholder="Search" variant='outline' onChange={e => listStore.setSearchQuery(e.target.value)}/>
            </InputGroup>

            <Stack gap='0.5rem'>
                <Text fontSize='sm' color='text.subtle'>Filters</Text>
                <ReactSelect<ReactSelectOption>
                    styles={selectStyles}
                    placeholder='Status'
                    options={WatchStatusOptions}
                    value={WatchStatusOptions.find(option => option.value === listStore.watchStatusFilter)}
                    onChange={selectedOption => listStore.setWatchStatusFilter(selectedOption ? selectedOption.value as string : null)}
                    isClearable
                />
                <ReactSelect<ReactSelectOption, true>
                    styles={selectStyles}
                    placeholder='Genres'
                    options={GenreOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    value={GenreOptions.filter(option => listStore.genresFilter.includes(option.value) )}
                    onChange={selectedGenres => {
                        listStore.setGenresFilter(selectedGenres.map(option => option.value as string))
                    }}
                />
            </Stack>

            <Stack gap='0.5rem'>
                <Text fontSize='sm' color='text.subtle'>Sort</Text>
                <ReactSelect<ReactSelectOption>
                    styles={selectStyles}
                    options={SortOptions}
                    value={SortOptions.find(option => option.value === listStore.sortPreference)}
                    onChange={selectedValue => listStore.setSortPreference(selectedValue?.value as string)}
                />
            </Stack>
        </Stack>
    )
})