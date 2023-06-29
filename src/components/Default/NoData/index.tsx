import { CloudOffOutlined } from '@mui/icons-material';

export default function NoData({ text }: {text?: string}){
    return(
        <div className='h-100 d-flex justify-content-center align-items-center flex-direction-column color-info'>
            <CloudOffOutlined fontSize="large" className='mb-2' />
            <h2 className="color-info">{text ? text : "Sem dados."}</h2>
        </div>
    );
}