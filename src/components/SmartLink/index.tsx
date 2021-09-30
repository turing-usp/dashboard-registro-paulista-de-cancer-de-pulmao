import { FunctionComponent } from "react"
import { NavLink } from 'react-router-dom'


type SmarLinkProps = {
    href: string,
} & React.ComponentPropsWithoutRef<"a">

const SmartLink: FunctionComponent<SmarLinkProps> = ({ href, children, ...props }) => {
    if (href.startsWith('http'))
        return <a {...props}>{children}</a>

    return <NavLink to={href} {...props}>{children}</NavLink>
}

export default SmartLink