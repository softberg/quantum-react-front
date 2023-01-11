import { useEffect } from 'react'
import { authApi } from './../../api/authApi';
import { useParams, useNavigate } from 'react-router-dom';

const ActivatePage = () => {

     const params = useParams()
     const navigate = useNavigate()

     useEffect(() => {
          authApi.activate(params.activate_token)
               .then(res => {
                    if (res.data.status === "success") {
                         navigate('/signin')
                    } else if (res.data.status === 'error') {
                         navigate('/404')
                    }
               })
     });

     return <> </>
}

export default ActivatePage