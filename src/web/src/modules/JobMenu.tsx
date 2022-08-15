import { ReactNode } from "react";

type Props = {
    npcName: string,
    title: string,
    text: string,
    children: ReactNode
}

const JobMenu = (props: Props) => {
    return (
        <div className='job_menu'>
            <div className='job_npc_name'>
                <span className='name'>{props?.npcName || 'Undefined'}</span>
            </div>

            <div className='job_npc_title'>
                <span className='title'>{props?.title || 'Undefined'}</span>
            </div>

            <div className='job_text'>
                <p className='text'>{props?.text || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ut. Natus perferendis error, rem libero at nulla laboriosam non. Repellat repellendus laudantium assumenda impedit molestias odio autem distinctio iure doloribus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ut. Natus perferendis error, rem libero at nulla laboriosam non. Repellat repellendus laudantium assumenda impedit molestias odio autem distinctio iure doloribus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ut. Natus perferendis error, rem libero at nulla laboriosam non. Repellat repellendus laudantium assumenda impedit molestias odio autem distinctio iure doloribus!'}</p>
            </div>
            
            {props?.children}
        </div>
    )
}

export default JobMenu;