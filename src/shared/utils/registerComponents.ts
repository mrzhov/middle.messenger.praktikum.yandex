import { Button } from '@/components/button';
import { ErrorPageContent } from '@/components/errorPageContent';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { AuthLayout } from '@/layouts/auth';
import { registerComponent } from '@/shared/core';

export default () => {
	registerComponent(AuthLayout);
	registerComponent(Button);
	registerComponent(Link);
	registerComponent(Input);
	registerComponent(ErrorPageContent);
};
