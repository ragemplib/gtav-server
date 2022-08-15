import { memo, useState } from 'react';
import rpc from 'rage-rpc';
import JobButton from '../../modules/JobButton';
import JobMenu from '../../modules/JobMenu';

const Collectors = () => {
    const [location, setLocation] = useState<string>('');
    
    const startWorkHandler = () => {
        setLocation((loc) => loc = 'Santos')
        console.log(location)
    }

    const wantRentHandler = () => {

    }

    const stopWorkHandler = () => {

    }

    const exitHandler = () => {
        
    }

    // rpc.register('getJobLocation', (location: string) => {
    //     setLocation(location);
    // });

    return (
        <div className='collectors'>
            <JobMenu npcName='Ivanella Kapchykevskaya' title='Работодатель' text='Добрый день, я могу помочь с трудойстройством на работу "Инкассатор". Для устройства вам требуется: Лицензия на вождение (C), Паспорт, Трудовая книжка, если у вас имеется всё ранее перечисленное, тогда добро пожаловать. Также хотим предупредить, работать можно только с 18 лет. Весь опыт полученный на работе, пойдёт вам в трудовую книжку.'>
                <div className='buttons'>
                    <JobButton text='Я хочу устроиться' clickFunction={startWorkHandler} />
                    <JobButton text='Я хочу арендовать ТС' clickFunction={wantRentHandler} />
                </div>
                <div className='buttons'>
                    <JobButton text='Я хочу уволиться' clickFunction={stopWorkHandler} />
                    <JobButton text='Выход' clickFunction={exitHandler} />
                </div>
            </JobMenu>
        </div>
    )
}

export default memo(Collectors);