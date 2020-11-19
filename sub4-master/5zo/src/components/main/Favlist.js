import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Favlist = ({ list }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                </Typography>
                <Typography variant="h5" component="h2">
                    {list.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    aaaaaaaaaaaaaa
                </Typography>
                <Typography variant="body2" component="p">
                    {list.tags.map(tag => <a>{'#' + tag.name + ' '}</a>)}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"> More... </Button>
            </CardActions>
        </Card>

    )

}
export default Favlist