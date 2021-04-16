
export function getActionFromClickedElement(clickedElement) {
  const elemWithActionInfo = clickedElement.nodeName === 'A' ? clickedElement?.childNodes?.[0] : clickedElement;

  if (elemWithActionInfo.nodeName === 'SPAN') {
    const action = elemWithActionInfo.dataset.action;
    const filename = elemWithActionInfo.dataset.filename;

    return {
      action,
      filename
    };
  } else {
    return {};
  }
}
