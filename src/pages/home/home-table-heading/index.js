import {createUseStyles} from "react-jss";
import Container from "../../../components/Container";
import Row from "../../../components/Row";
import Column from "../../../components/Column";

const useStyles = createUseStyles(theme => ({
    tasksHeader: {
        background: "#fff",
        borderTop: `1px solid ${theme.palette.grey[400]}`,
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
        [theme.mediaQueries.m]: {
            display: "none"
        },
    },
    taskHeaderRoot: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    taskHead: {
        display: "grid",
        height: 40,
        gridTemplateColumns: "1.13fr 0.3fr 0.25fr 0.12fr 0.12fr",
        alignItems: "center",
        fontSize: 14,
        fontWeight: 500,
        color: theme.palette.common.textBlack,
    },
    headLabel: {
        ...theme.utils.flexbox.centered,
        height: 40,
        borderLeft: `1px solid ${theme.palette.grey[400]}`,
    },
}))

const HomeTableHeader = () => {
    const classes = useStyles();

    return <div className={classes.tasksHeader}>
        <Container className={classes.taskHeaderRoot}>
            <Row>
                <Column start={2} span={10}>
                    <div className={classes.taskHead}>
                        <span>Activity</span>
                        <span className={classes.headLabel}>Due Date</span>
                        <span className={classes.headLabel}>Effort</span>
                    </div>
                </Column>
            </Row>
        </Container>
    </div>
}

export default HomeTableHeader;