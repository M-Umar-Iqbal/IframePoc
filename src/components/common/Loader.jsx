import { Puff } from 'react-loader-spinner'

function Loader() {
    return (
        <Puff
            visible={true}
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default Loader