export const formatModelResponse = (text: string): string => {
    return text
      // Handle bold text (**text**)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Handle bullet points (ensure there's a line break)
      .replace(/^[•*-] /gm, '<br/>• ')
      // Handle multiple line breaks
      .replace(/\n\n+/g, '<br/><br/>')
      // Handle single line breaks
      .replace(/\n/g, '<br/>');
  };