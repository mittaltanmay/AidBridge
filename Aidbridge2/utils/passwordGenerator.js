export function passwordgenerator(name,state,location)
{
    const no_space=name.replaceAll(' ','');
    let name_part=no_space;
    if(no_space.length>5)
    {
        name_part=no_space.substring(0,5);
    }
    const state_part=state.substring(0,3);
    const location_part=location.substring(0,3);
    let  password=name_part+state_part+location_part;
    password=password.toLowerCase();
    return password;
}