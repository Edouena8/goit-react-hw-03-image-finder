import { RotatingLines } from 'react-loader-spinner'
import { LoaderWrap } from './Loader.styled';

const Loader = () => {
    return (
        <LoaderWrap>
            <RotatingLines strokeColor="#3f51b5"/>
        </LoaderWrap>
    )
};

export default Loader;