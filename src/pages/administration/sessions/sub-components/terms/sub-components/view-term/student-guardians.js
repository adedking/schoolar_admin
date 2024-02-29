import React from 'react';
import {  
    DataTable, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableExpandHeader, 
    TableExpandRow, 
    TableExpandedRow, 
    TableHead, 
    TableHeader, 
    TableRow, 
} from 'carbon-components-react';
import { useParams } from 'react-router-dom';
import { useGetStudent } from '../../../../redux/students/hook';
import { ArrowRight } from '@carbon/icons-react';

const StudentGuardian = () => {

    const {id} = useParams();
    const { data: student } = useGetStudent(id);
    const mobileTableHeader = {
        main:[
            {
                key: 'uuid',
                header: 'id',
            },
            {
                key: 'title',
                header: 'Title',
            },
            {
                key: 'first_name',
                header: 'First Name',
            },
            {
                key: 'last_name',
                header: 'Last Name',
            },
            {
                key: 'email',
                header: 'Email Address',
            },
            {
                key: 'mobile',
                header: 'Contact Number',
            },
            {
                key: 'occupation',
                header: 'Occupation',
            },
            {
                key: 'primary_parent',
                header: 'primary_parent',
            },
            {
                key: 'full_address',
                header: 'full_address',
            },
        ],
        
    };
    return (
        <DataTable rows={student?.parents ? student?.parents : []} experimentalAutoAlign headers={mobileTableHeader.main} size='lg' render={({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            getTableContainerProps
        }) => 
            <React.Fragment>
                <TableContainer title={"Student Parents"} {...getTableContainerProps()} className='flex flex-col flex-wrap -mt-2'>
                    {student?.parents ?
                    <Table {...getTableProps()}>
                    <TableHead>
                        <TableRow>
                            <TableExpandHeader />
                            {mobileTableHeader.main.map((header, i) => (
                                <>
                                {header.header === 'id' || header.header === 'primary_parent' || header.header === 'full_address' ?
                                null :
                                <TableHeader key={i} {...getHeaderProps({
                                    header
                                })}>
                                    {header.header}
                                </TableHeader>}
                                </>))
                            }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => 
                                <React.Fragment key={row.id}>
                                    <TableExpandRow  
                                        className='!text-[14px]' 
                                        {...getRowProps({
                                            row
                                        })}
                                    >
                                        {row.cells.map(cell => (
                                            <>
                                                {cell.id.split(":")[1] === 'id' || cell.id.split(":")[1] === 'uuid' || cell.id.split(":")[1] === 'primary_parent' || cell.id.split(":")[1] === 'full_address' ?
                                                null 
                                                :
                                                <TableCell key={cell.id}>{cell.value ? cell.value : '-' }</TableCell>
                                                }
                                            </>
                                        ))}
                                    </TableExpandRow>
                                    <TableExpandedRow colSpan={headers.length + 3} className="demo-expanded-td">
                                        <div className='flex justify-between items-center py-2'>
                                            <div className='flex flex-col justify-center'>
                                                {row.cells.map(cell => (
                                                    <div className='text-primary font-normal'>
                                                        {cell.id.split(":")[1] === 'primary_parent' ?
                                                            <>
                                                                {cell.value === 1 ? 
                                                                <span className='text-[15px]'>Primary Guardian</span> :
                                                                <span>Secondary Guardian</span>
                                                                }
                                                            </>
                                                        :
                                                        null}
                                                    </div>
                                                ))}
                                                {row.cells.map(cell => (
                                                    <div className='flex gap-2 text-[13px]'>
                                                        {cell.id.split(":")[1] === 'full_address' ?
                                                        <>
                                                            <span className='font-semibold'>Address: </span>
                                                            <span>{cell.value}</span>
                                                        </> 
                                                        :
                                                        null}
                                                    </div>
                                                ))}
                                            </div>
                                            <div 
                                                className='flex gap-2 text-primary text-[14px] cursor-pointer justify-end hover:underline hover:font-semibold duration-300'
                                            >
                                                View <ArrowRight />
                                            </div>
                                        </div>
                                        
                                    </TableExpandedRow>
                                </React.Fragment>
                            )}
                        </TableBody>
                    </Table>
                    :
                    null}
                    
                </TableContainer>
        
            </React.Fragment>
        } />
    );
};

export default StudentGuardian;