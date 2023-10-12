
import React from 'react';
import { InlineLoading, Button } from "carbon-components-react";

const AppButton = ({ text, type, kind, className, renderIcon, action, loading }) => {
  return (
    <React.Fragment>
        {loading ? 
            <InlineLoading
                style={{
                marginLeft: '1rem'
                }} 
                description='Loading' 
            /> : 
            <Button
                type={type}
                kind={kind} 
                className={className}
                renderIcon={renderIcon}
                onClick={() => {
                    action()
                }}
            >
                {text}
            </Button>
        }
        </React.Fragment>

  );
};

export default AppButton;