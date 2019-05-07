import * as React from 'react';

interface ResultBoxProps {
  isHttps:boolean;
  uploadName:string;
}

export function ResultBox(props:ResultBoxProps) {

  const {
    isHttps,
    uploadName,
  } = props;

  const resultURL = `${ isHttps ? 'https://' : 'http://' }${ 'domain' }/${ uploadName }`;

  return (
    <React.Fragment>
      { resultURL }
    </React.Fragment>
  );
}