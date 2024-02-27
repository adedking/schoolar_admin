import { TableCell } from 'carbon-components-react';
import classNames from 'classnames';
import React from 'react';

export const StatusCell = ({ id, code, statusConfig, className }) => {
  return (
    <>
      {code !== undefined ? (
        <TableCell
            key={id}
            className={classNames(
                className,
                'text-[14px] !text-color-white',
                {
                  'py-1 px-2 !bg-[#1bc047de]':
                    statusConfig[code]?.color === 'green',
                },
                {
                  'py-1 px-2 !bg-color-orange':
                    statusConfig[code]?.color === 'orange',
                },
                {
                  'py-1 px-2 !bg-color-error':
                    statusConfig[code]?.color === 'red',
                },
            )}
        >
            {statusConfig[code]?.label ? statusConfig[code]?.label : 'None'}
        </TableCell>
      ) : null}
    </>
  );
};