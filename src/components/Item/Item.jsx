import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Item = ({ id, title, writer, cover_image_url, price, tags }) => {
  const navigate = useNavigate();
  const handleNavigation = () => navigate(`/item/${id}`);

  return (
    <Card className="animate__animated animate__fadeIn" raised>
      <CardActionArea>
        <CardMedia
          component="img"
          height="260"
          image={cover_image_url}
          alt={id}
          onClick={handleNavigation}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {writer}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {tags}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button size="small" color="error" onClick={handleNavigation}>
          View Details
        </Button>
        <Typography variant="subtitle2" color="text.secondary" align="right">
          {`$${price}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Item;
