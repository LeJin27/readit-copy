
export const dateConverterHelper = (dateString: string | undefined): string => {
  if (!dateString) {
    return "<No Date Error>"
  }
  return (new Date(dateString)).toISOString();
  

}