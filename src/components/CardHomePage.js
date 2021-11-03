import React from 'react';
import { AppBar, Paper, Toolbar, Typography, Button, IconButton, Box, Grid, Card, CardContent, Divider  } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function CardHomePage({name, description, Icon, path, buttonText}){
    return(
        <Card style={{width:"100%"}}>
                <CardContent>
                    <Box style={{height: "70%"}} m={1} display="flex" alignItems="center" flexDirection="column">
                        <Icon color="primary"/>
                        <Typography variant="h6" color="primary">
                            {name}
                        </Typography>
                        <Typography color="secondary">
                            {description}
                        </Typography>
                    </Box>
                    <Box style={{height: "30%"}} display="flex" alignItems="center" flexDirection="column-reverse">
                        <Button size="medium" style={{marginBottom: "1vw"}} href={path} variant="outlined" color="primary">
                            {buttonText}
                        </Button>
                    </Box>
                        
                    
                </CardContent>
        </Card>
    )
}