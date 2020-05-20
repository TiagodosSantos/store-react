import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const DeleteCell = ({removeData, id}) => {

      if(!removeData)
        return null;

        return (
          <TableCell>
              <Button 
                variant="contained" 
                color="primary"
                onClick = {() => 
                {removeData(id)}}>
                  Remover
              </Button>
          </TableCell>
      )
}

const DeleteTitle = ({removeData}) => {

  if(!removeData)
    return null;

  return <TableCell>Remover</TableCell>;
  
}

const CustomizedTable = (props) => {

    const {fields, data, removeData} = props;
    
    return (
      <Table>
         <TableHead>
            <TableRow>
              {fields.map(field => (
                  <TableCell key={field.title}>{field.title}</TableCell>
                ))}
              <DeleteTitle removeData={removeData}/>
            </TableRow>
          </TableHead>
        <TableBody>
          { data.map((data) => (
                <TableRow key={data.id}>
                  {fields.map((field,index) => (
                      <TableCell key={index}>{data[field.data]}</TableCell>
                    ))}
                  <DeleteCell id={data.id} removeData={removeData}/>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    );
}

export default CustomizedTable;
