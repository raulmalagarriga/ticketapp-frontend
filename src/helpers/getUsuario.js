export const getUsuario = () => {
    return{
        nombre: localStorage.getItem('nombre'),
        escritorio: localStorage.getItem('escritorio')
    }
}