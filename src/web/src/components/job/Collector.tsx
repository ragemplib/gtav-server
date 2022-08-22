import { memo, useState } from 'react';
import rpc from 'rage-rpc';
import JobButton from '../../modules/JobButton';
import JobMenu from '../../modules/JobMenu';
import VehicleRent from '../../modules/VehicleRent';
import CountDown from '../../modules/CountDown';

/**
 * @param location - Место откуда игрок устраивается на работу
 * @param status - Устроен ли игрок на работе, если да, то кнопка "Я хочу устроиться" изменяется на "Продолжить работать" 
 */
type ServerDataProps = {
    location: string,
    status: boolean,
};

/** Переключение страницы на: ... */
type PageProps = 'VehicleRent' | '';

const Collectors = () => {
    const [data, setData] = useState<ServerDataProps>({
        location: '',
        status: false
    });

    const [page, setPage] = useState<PageProps>('');

    const startWorkHandler = () => {
        // @ts-ignore
        if (window.mp) {
            // @ts-ignore
            window.mp.trigger('callServerPlayerStartWorkOnCollectors', data.location);
        }
    }

    const wantRentHandler = () => {
        setPage('VehicleRent');
    }

    const stopWorkHandler = () => {
        setData({ ...data, location: '', status: false });
        // @ts-ignore
        if (window.mp) {
            // @ts-ignore
            window.mp.trigger('callServerPlayerStopWorkOnCollectors', { ...data });
        }
    }

    const exitHandler = () => {
        setData({ ...data, location: '' });
        // @ts-ignore
        if (window.mp) {
            // @ts-ignore
            window.mp.trigger('closeCollectorsMenu');
        }
    }

    rpc.register('getJobLocation', (data: ServerDataProps) => {
        setData({ ...data, location: data.location, status: data.status });
    });

    return (
        <div className={page === '' ? 'collectors' : 'hidden'}>
            <JobMenu npcName='Ivanella Kapchykevskaya' title='Работодатель' text='Добрый день, я могу помочь с трудойстройством на работу "Инкассатор". Для устройства вам требуется: Лицензия на вождение (C), Паспорт, Трудовая книжка, если у вас имеется всё ранее перечисленное, тогда добро пожаловать. Также хотим предупредить, работать можно только с 18 лет. Весь опыт полученный на работе, пойдёт вам в трудовую книжку.'>
                <div className='buttons'>
                    <JobButton text={data.status ? 'Продолжить работать' : 'Я хочу устроиться'} clickFunction={startWorkHandler} />
                    <JobButton text='Я хочу арендовать ТС' clickFunction={wantRentHandler} />
                </div>
                <div className='buttons'>
                    <JobButton text='Я хочу уволиться' clickFunction={stopWorkHandler} />
                    <JobButton text='Выход' clickFunction={exitHandler} />
                </div>
            </JobMenu>

            {page === 'VehicleRent' && (
                <>
                    <VehicleRent
                        status={true}
                        time={'15m'}
                        list={[{ name: 'test', imageSrc: 'testimagesrc', price: 10000 }]}
                        rentType='Job Vehicles'
                    />

                    {/* <CountDown hours={1} minutes={10} seconds={15} /> */}
                </>
            )}
        </div>
    )
}

export default memo(Collectors);