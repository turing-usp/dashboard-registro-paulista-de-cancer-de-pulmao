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
            alignItems: "center"
          },
          spacing: {
            marginTop: theme.spacing(5)
          },
          cardContent: {
            align: "center"
          },
          mainDivLogin: {
            flexGrow: 1,  
            minHeight: "100vh",
            backgroundSize: '100% auto'
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
          loginButton: {
              marginTop: theme.spacing(3)
          }
      })
)
    )
}

export default useStylesCreator;