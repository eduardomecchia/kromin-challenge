import {createUseStyles} from "react-jss";
import SearchBar from "../../../components/SearchBar";
import FilterButton from "../../../components/FilterButton";
import {useNavigate} from "react-router-dom";
import {ROUTE_COMPLETED} from "../../../utilities/constants";
import ControlledSelect from "../../../components/ControlledSelect";
import DatePickerInput from "../../../components/DatePickerInput";
import {TASK_PRIORITIES} from "../../../models/task";

const useStyles = createUseStyles(theme => ({
    filterBar: {
        padding: [16, 12],
        display: 'flex',
        gap: 16,
        justifyContent: 'end',
        minHeight: 80,
        flexDirection: 'column-reverse',
        alignItems: 'end',
        backgroundColor: theme.palette.common.white,
        [theme.mediaQueries.lUp]: {
            alignItems: 'center',
            flexDirection: 'row',
            padding: '16px 56px',
            gap: 80,
        }
    },
    actions: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        [theme.mediaQueries.lUp]: {
            gap: 16,
            justifyContent: 'end',
        }
    },
    search: {
        display: 'none',
        [theme.mediaQueries.lUp]: {
            display: 'block'
        }
    },
    searchMobile: {
        display: 'block',
        width: '100%',
        [theme.mediaQueries.lUp]: {
            display: 'none'
        }
    },
    searchBar: {
        minWidth: 280,
        borderRadius: 12,
        flex: 1,
        '& input': {
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: `#ECEEF0`,
            '& :placeholder': {
                color: theme.palette.secondary.main
            }
        },
        [theme.mediaQueries.lUp]: {
            minWidth: 332,
        }
    }
}))

const FilterBar = ({onPriorityHandler = Function.prototype, onSearchHandler = Function.prototype, dateFilter, onDateChangeHandler = Function.prototype}) => {

    const navigate = useNavigate();
    const classes = useStyles();

    return <div className={classes.filterBar}>
        <div className={classes.actions}>
            <DatePickerInput
                value={dateFilter}
                selectRange
                callback={onDateChangeHandler}
            />
            <ControlledSelect
                onChangeCallback={onPriorityHandler}
                onClear={() => onPriorityHandler(false)}
                name={'effort'}
                placeholder={'Effort'}
                isClearable
                options={TASK_PRIORITIES}
            />
            <FilterButton onClickCallback={() => navigate(ROUTE_COMPLETED) }>Completed</FilterButton>
        </div>
        <div className={classes.search}>
            <SearchBar className={classes.searchBar} onSearchCallback={onSearchHandler}/>
        </div>
        <div className={classes.searchMobile}>
            <SearchBar className={classes.searchBar} onSearchCallback={onSearchHandler}/>
        </div>
    </div>
}

export default FilterBar;