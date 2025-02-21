'use client';

import { useRouter } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import { BASE_DOMAIN, ROUTES } from '@/constants/_navbar';

const QrCodeCanvas = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <QRCodeCanvas
      size={144}
      id='qrcode'
      className='rounded-lg border border-grey-100 p-6'
      onClick={() => router.push(`${ROUTES.SURVEY.TAKE}/${id}`)}
      value={`${BASE_DOMAIN}${ROUTES.SURVEY.TAKE}/${id}`}
    />
  );
};

export default QrCodeCanvas;
