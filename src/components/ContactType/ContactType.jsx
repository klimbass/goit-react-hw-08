import css from "./ContactType.module.css";



export default function ContactType({contactType}){
switch(contactType){
    case 'work':
        return <div className={`${css.contactType} ${css.workGreen}`}>work</div>;
    case 'home':
        return <div className={`${css.contactType} ${css.homeBlue}`}>home</div>;
    default :
        return <div className={`${css.contactType} ${css.personalRed}`}>personal</div>
    
}
}