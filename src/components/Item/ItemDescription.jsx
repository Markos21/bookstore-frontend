import { Fragment } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const ItemDescription = ({ characteristics }) => (
  <Paper elevation={8} sx={{ my: 3, p: 2 }}>
    <Fragment>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Title:</strong> {characteristics.title.toLowerCase()}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Writer:</strong> {characteristics.writer.toLowerCase()}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Tags:</strong> {characteristics.tags.join(", ").toLowerCase()}
      </Typography>
      <Divider />
    </Fragment>
  </Paper>
);

export default ItemDescription;
