import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import estilos from "./card.module.css"

const CardComponent = ({ titulo, desc, img}) => {
  return (
    <>
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={img}
            title="green iguana"
          />
          <CardContent>
            <Typography
              className={estilos.card_title}
              gutterBottom
              variant="h5"
              component="div"
            >
                {titulo}
            </Typography>
            <Typography
              className={estilos.card_desc}
              variant="body2"
              color="text.secondary"
            >
                {desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large">
              Compratilhar
            </Button>   
            <Button size="large">
              Ver mais
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default CardComponent;