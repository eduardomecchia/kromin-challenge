import React, {useEffect, useState} from 'react';
import Input from "./Input";
import {CrossIcon, SearchIcon} from "../theme/icons";
import {saferun} from "../utilities/helpers";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(theme => ({
    searchBarWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        minHeight: 48
    },
    closeButton: {
        display: 'flex',
        cursor: 'pointer',
        fontSize: 14,
        [theme.mediaQueries.lUp]: {
            display: 'none'
        }
    },
    closedSearch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        minHeight: 48
    }
}))
const SearchBar = ({onSearchCallback, className , collapsed = false, ...rest}) => {
    const [searchText, setSearchText] = useState('')

    useEffect(
        () => {
            saferun(onSearchCallback, searchText)
        },
        [searchText]
    )

    const classes = useStyles();

    return <div className={classes.searchBarWrapper}>
            <Input rootClassName={className}
                   icon={<SearchIcon/>}
                   name={'search'}
                   placeholder={'Search...'}
                   value={searchText}
                   statusIconCallback={() => setSearchText('')}
                   statusIcon={searchText && <CrossIcon width={12} height={12}/>}
                   onChange={e => setSearchText(e.target.value)}/>
        </div>
}

export default SearchBar;