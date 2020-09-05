import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Chat from '@material-ui/icons/Chat';
import { Photo } from './Photo';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

interface Props {
  photo: Photo;
}

const ReviewCard: React.FC<Props> = ({ photo }: Props) => {
  const { userImageURL, user, previewURL, tags, favorites, downloads, comments } = photo;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} alt={user} src={userImageURL} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={tags}
        subheader={user}
      />
      <CardMedia className={classes.media} image={previewURL} title={tags} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          <div className="App__favorites-text">{favorites}</div>
        </IconButton>
        <IconButton aria-label="delete" size="medium">
          <ArrowDownwardIcon fontSize="inherit" />
          <div className="App__favorites-text">{downloads}</div>
        </IconButton>
        <IconButton aria-label="share">
          <Chat />
          <div className="App__favorites-text">{comments}</div>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ReviewCard;
