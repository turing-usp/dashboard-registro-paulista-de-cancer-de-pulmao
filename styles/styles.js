import { makeStyles } from '@material-ui/core/styles';

const useStylesCreator = () => {
    return(
      makeStyles((theme) => ({
        mainDash: {
          flexGrow: 1,
        },
        title: {
          flexGrow: 1,
        },
        loginButton: {
          color: "#ffffff"
        },
        lungIcon: {
          align: "center",
          margin: 'auto'
        },
        loading: {
          top: 0,
          width: '100%',
          position: 'absolute',
          height: 5
        },
        formControl: {
          marginBottom: theme.spacing(2),
          width: "100%",
          color: theme.palette.secondary
        },
        dashGrid: {
          margin: "auto",
          marginTop: theme.spacing(1),
          width: "95%"
        },
        mainDiv: {
            flexGrow: 1,  
            backgroundImage: "url(/lungPicture.jpg)",
            minHeight: "100vh",
            backgroundSize: '100% auto'
          },
          title: {
            flexGrow: 1,
            fontWeight: 1000,
            marginBottom: theme.spacing(3)
          },
          card: {
            margin: "auto",
            width: "60%",
            alignItems: "center",
            [theme.breakpoints.down('xs')]: {
              width: "90%",
            }
          },
          spacing: {
            marginTop: theme.spacing(5)
          },
          cardContent: {
            align: "center"
          },
          mainDivLogin: {
            flexGrow: 1,  
        },
        lungIcon: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(5)
          },
        loginCard: {
              align: "center", 
              margin: "auto",
              marginTop: theme.spacing(3),
              width: "40%",
              [theme.breakpoints.down('xs')]: {
                width: "90%",
              }
          },
        logo: {
          width: "auto",
          height: "5vh"
        },
        loginButton: {
              marginTop: theme.spacing(3)
          },
        confirmInput: {
          width: "90%"
        }
      })
)
    )
}

export default useStylesCreator;