import { memo, useState } from "react";

/**
 * @param status - Если взять авто в аренду, то status отправиться на сервер в бд (для сохранения времени и т.п состояний)
 */
type VehicleRentProps = {
    status: boolean,
    time: '15m' | '30m' | '60m' | '120m' | '180m',
    list: listProps,
    rentType: 'Default vehicles' | 'Job Vehicles';
}

type listProps = [{ name: string, imageSrc: string, price: number }];

const VehicleRent = (props: VehicleRentProps) => {
    return (
        <div className='vehicle_rent'>
            {props.list.map((el, index) => (
                <p key={index}>
                    {props.rentType === 'Job Vehicles' && <></>}
                    {props.rentType === 'Default vehicles' && <></>}
                </p>
            ))}
        </div>
    )
}

export default memo(VehicleRent);